const ErrorPageComponent = ({ history }) => {
  const toHome = () => history.push(`/home`);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 d-flex flex-column align-items-center">
            <div
              className="empty-img"
              style={{ width: "250px", height: "200px" }}
            >
              <img
                src="../assets/images/empty-image.png"
                alt=""
                className="w-100 h-100"
              />
            </div>
            <h5 className="m-4">
              I'm sorry! DrugMart couldn't find any products in your check out
              page.
            </h5>
            <button className="btn btn-primary " onClick={() => toHome()}>
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPageComponent;
