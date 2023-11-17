class ConvertFormatPrice {
  convertDollarToVND = (soTien) => {
    if (typeof soTien === "number" && !isNaN(soTien)) {
      var soTienDaXuLi = soTien.toLocaleString("vi-VN");
      console.log(soTienDaXuLi);
      return soTienDaXuLi;
    } else {
      console.error("Invalid input for convertDollarToVND:", soTien);
      return "";
    }
  };
}

export default ConvertFormatPrice;
