const VoucherComponent = () => {
    const VOUCHER_IMGS_URL = "../assets/img/voucher"
    return (
        <div className="container text-center">
            {/* <img width='70%' src={`${VOUCHER_IMGS_URL}/isac.png`} alt="anhquangcao" />
                 */}

            <div className="row">
                <div class="col-md-4 dropdown">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Dropdown button
                    </button>
                    <div class="dropdown-menu">
                        <img src="https://static.thenounproject.com/png/159033-200.png" alt="" />
                        <a class="dropdown-item" href="#">Link 2</a>
                        <a class="dropdown-item" href="#">Link 3</a>
                    </div>
                </div>
                <div class="col-md-4 dropdown">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Dropdown button
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Link 1</a>
                        <a class="dropdown-item" href="#">Link 2</a>
                        <a class="dropdown-item" href="#">Link 3</a>
                    </div>
                </div>
                <div class="col-md-4 dropdown">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        Dropdown button
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Link 1</a>
                        <a class="dropdown-item" href="#">Link 2</a>
                        <a class="dropdown-item" href="#">Link 3</a>
                    </div>
                </div>
            </div>


            <p>Special Discount</p>

            <img src={`${VOUCHER_IMGS_URL}/voucherBg.png`} alt="" />
            <div className="row" style={{ marginTop: "20px" }}>

                <div className="row col-md-6">
                    <img className="" style={{ borderRadius: "5%", marginLeft: "15px" }} src="https://static.thenounproject.com/png/159033-200.png" alt="" />
                    <div className="col-md-7" style={{ borderRadius: "3%", border: "2px solid g" }}>
                        <h4 className="text-dark">Giảm 30k</h4>
                        <button className="btn btn-danger">Save</button>
                    </div>
                </div>

                <div className="row col-md-6">
                    <img className="" style={{ borderRadius: "5%", marginLeft: "15px" }} src="https://static.thenounproject.com/png/4727320-200.png" alt="" />
                    <div className="col-md-7" style={{ borderRadius: "3%", border: "2px solid g" }}>
                        <h4 className="text-dark">Giảm 30k</h4>
                        <button className="btn btn-danger">Save</button>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default VoucherComponent