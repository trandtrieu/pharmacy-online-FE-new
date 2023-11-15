import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 20); // Đổi giá trị này để chỉ hiển thị khi scrollTop > một giá trị nhất định, ví dụ: 200
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <span
      className={`scroll-to-top-span ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      &#8593; Top
    </span>
  );
};

export default ScrollToTopButton;
