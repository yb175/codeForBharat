import React, { useState } from "react";
import SellItemCard from "./BuyAndSellCard";
import SellItemForm from "./BuyAndSellForm";
import "./BuyAndSell.css";

const BuyAndSell = () => {
  const [showForm, setShowForm] = useState(false);

  const dummyItems = [
    {
      id: 1,
      title: "Wireless Mouse",
      description: "Almost new Logitech mouse.",
      category: "electronics",
      location: "Block A",
      datePosted: new Date().toISOString(),
      sellerName: "Ravi Kumar",
      contact: "9876543210",
      price: 800,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/3-Tasten-Maus_Microsoft.jpg/640px-3-Tasten-Maus_Microsoft.jpg",
    },
    {
      id: 2,
      title: "Casio Scientific Calculator FX-991EX",
      description: "Perfect working condition, used for 1 semester.",
      category: "electronics",
      location: "Hostel C - Room 202",
      datePosted: new Date().toISOString(),
      sellerName: "Rahul Sharma",
      contact: "9876543210",
      price: 950,
      image: "https://m.media-amazon.com/images/I/61HXfPgQcqL._SL1100_.jpg",
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "books", label: "Books" },
    { value: "furniture", label: "Furniture" },
    { value: "clothing", label: "Clothing" },
    { value: "others", label: "Others" },
  ];

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
            disabled
          />
        </div>

        <div className="filter-tabs">
          {categories.map((category) => (
            <button key={category.value} className="filter-tab" disabled>
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
              onSubmit={() => setShowForm(false)}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <div className="buy-sell-grid">
        {dummyItems.map((item) => (
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
