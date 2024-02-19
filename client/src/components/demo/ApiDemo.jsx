import React, { useEffect, useState } from "react";
import Pagination from "./paginate/Pagination";

export default function ApiDemo() {
  const [productData, setProductData] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        if (res.ok) {
          setProductData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchProduct(e.target.value);
  };

  const searchP = productData.filter((product) =>
    product.title.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const searchByRating = productData.filter(
    (product) => product.rating.rate > 4.5 || 4.1
  );

 

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = productData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //   console.log(indexOfLastProduct);
    //   console.log(indexOfFirstProduct);
    //   console.log(currentProducts);
    //   console.log(paginate);
          console.log(currentProducts);

    const handleNext = () => {
        
        setCurrentPage(currentPage +1)
    }

    const handlePrev = () => {
        setCurrentPage(currentPage -1)
    }


  return (
    <div>
      <div>
        <input
          onChange={handleSearch}
          type="text"
          name=""
          id=""
          placeholder="search product"
        />
      </div>
      <div
        style={{
          display: "flex",
          padding: "5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {currentProducts.map((product) => (
          <div
            key={product.id}
            style={{
              width: "17rem",
              border: "1px solid grey",
              padding: "5px",
            }}
          >
            <img
              src={product.image}
              alt=""
              style={{
                width: "100%",
                height: "15rem",
                objectFit: "cover",
              }}
            />

            <strong
              style={{
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {product.title}
            </strong>

            <p>{product.rating.rate}</p>
            <p>{product.rating.count}</p>
          </div>
        ))}
      </div>

      <Pagination
        productPerPage={productPerPage}
        totalProducts={productData.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button onClick={handlePrev}
          style={{
            width: "100px",
            height: "30px",
          }}
        >
          Previous
        </button>
        <p>1 2 3 4 5</p>
        <button onClick={handleNext}
          style={{
            width: "100px",
            height: "30px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
