import React, { useState, useEffect } from "react";

const USERS_URL = "https://example.com/api/users";

export default function Table() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${USERS_URL}?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data.results);
      setCurrentPage(page);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageClick = (page) => {
    if (page >= 0 && page < totalPages && !isLoading) {
      fetchData(page);
    }
  };

  const onFirstPage = () => setCurrentPage(0);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onLastPage = () => setCurrentPage(totalPages - 1);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, firstName, lastName }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="pagination">
        <button className="first-page-btn" onClick={onFirstPage} disabled={isLoading || currentPage === 0}>
          first
        </button>
        <button className="previous-page-btn" onClick={onPrevPage} disabled={isLoading || currentPage === 0}>
          previous
        </button>
        <button className="next-page-btn" onClick={onNextPage} disabled={isLoading || currentPage === totalPages - 1}>
          next
        </button>
        <button className="last-page-btn" onClick={onLastPage} disabled={isLoading || currentPage === totalPages - 1}>
          last
        </button>
      </section>
    </div>
  );
}
