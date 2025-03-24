import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel, Typography, List, ListItem, ListItemText } from "@mui/material";

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [sortOption]);

  const fetchTransactions = async () => {
    try {
      let url = "http://localhost:3000/transactions";
      if (sortOption) {
        url += `?sort=${sortOption}`;
      }

      const response = await axios.get(url);
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Transactions</Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          label="Sort by"
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="amount-asc">Amount (Low to High)</MenuItem>
          <MenuItem value="amount-desc">Amount (High to Low)</MenuItem>
          <MenuItem value="date-asc">Date (Oldest First)</MenuItem>
          <MenuItem value="date-desc">Date (Newest First)</MenuItem>
          <MenuItem value="description-asc">Description (A-Z)</MenuItem>
          <MenuItem value="description-desc">Description (Z-A)</MenuItem>
        </Select>
      </FormControl>

      <List>
        {transactions.map((transaction) => (
          <ListItem key={transaction.id}>
            <ListItemText
              primary={`${transaction.description} - $${transaction.amount}`}
              secondary={`Date: ${transaction.date}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TransactionsList;