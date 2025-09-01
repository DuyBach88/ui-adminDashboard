import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup, Table } from "react-bootstrap";

const Crypto = () => {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins", {
        headers: {
          "X-API-KEY": "CAet/IU63zVPt5sxmTLdsuGA0l1o6qr9mGoV6rGQkOk=",
        },
      })
      .then((response) => {
        setCurrency(response.data.result);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Crypto Currency App</h2>

      <InputGroup className="mb-4">
        <Form.Control
          placeholder="Search by name or symbol"
          aria-label="Search by name or symbol"
          aria-describedby="basic-addon2"
          style={{
            width: "200px",
            height: "40px",
            padding: "10px",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Icon</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Available Supply</th>
            <th>Volume (24hr)</th>
          </tr>
        </thead>
        <tbody>
          {currency
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <tr key={index}>
                <td>{item.rank}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={item.icon}
                    alt={item.name}
                    style={{ width: "30px", height: "30px" }}
                  />
                </td>
                <td>{item.symbol}</td>
                <td>{item.marketCap}</td>
                <td>{item.price}</td>
                <td>{item.availableSupply}</td>
                <td>{item.volume}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Crypto;
