import React, { useState } from "react";
import SellItemCard from "./BuyAndSellCard";
import SellItemForm from "./BuyAndSellForm";
import "./BuyAndSell.css";
import { sellItems } from "../../data/mockData";

const BuyAndSell = () => {
  const [Items, setItems] = useState(sellItems);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCardId, setActiveCardId] = useState(null);
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "books", label: "Books" },
    { value: "furniture", label: "Furniture" },
    { value: "clothing", label: "Clothing" },
    { value: "stationary", label: "Stationary" },
    { value: "others", label: "Others" },
  ];
  const filteredItems = Items.filter((item)=>{
    const matchedSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    const catagoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    return matchedSearch && catagoryMatch
  })
  return (
    <div className="buy-and-sell">
      <div className="buy-sell-header">
        <h1 className="buy-sell-title">🛍️ Buy & Sell</h1>
        <p className="buy-sell-subtitle">
          Sell your unused stuff or find great deals!
        </p>
      </div>

      <div className="buy-sell-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search items..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {categories.map((category) => (
            <button key={category.value} className="filter-tab" onClick={() => setSelectedCategory(category.value)} >
              {category.label}
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary add-item-btn"
          onClick={() => setShowForm(true)}
        >
          + Sell Item
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <SellItemForm
              Items={Items}
              setItems={setItems}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="buy-sell-grid">
        {filteredItems.map((item) => (
          <SellItemCard
            key={item.id}
            item={item}
            activeCardId={null}
            setActiveCardId={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default BuyAndSell;
