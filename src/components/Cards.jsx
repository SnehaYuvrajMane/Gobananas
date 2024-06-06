import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { styled } from "@mui/material";

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  let api = "https://fakestoreapi.com/products";

  const FetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchApiData(api);
  }, []);

  useEffect(() => {
    const filteredProduct = data.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filteredProduct);
  }, [search]);

  return (
    <>
      <div className="main">
        <div>
          <input
            type="text"
            onChange={handleInput}
            value={search}
            placeholder="Search Products..."
            style={{
              color: "grey",
              width: "300px",
              padding: "8px",
              margin: "10px",
              borderRadius: "5px",
            }}
          />
        </div>

        <div className="content">
          {products.map((product) => (
            <Card
              sx={{ maxWidth: 345 }}
              style={{
                width: "300px",
                height: "350px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  src={product.image}
                  alt="green iguana"
                  style={{
                    objectFit: "contain",
                    width: "300px",
                    height: "130px",
                    textAlign: "center",
                  }}
                />
                <CardContent
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    gutterBottom
                    component="div"
                    style={{
                      color: "#FDB44E",
                      fontWeight: "500px",
                      width: "280px",
                      height: "90px",
                      font: "8px",
                      textAlign: "center",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    style={{
                      width: "280px",
                      height: "30px",
                      textAlign: "left",
                      color: "blue",
                    }}
                  >
                    Rating:{product.rating.rate}/5.0
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "30px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
