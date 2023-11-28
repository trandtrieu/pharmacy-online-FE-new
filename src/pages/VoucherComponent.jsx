import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { getAllDiscountCodeById, getAllDiscountCode, addDiscountToAccount } from "../services/VoucherService";
import { toast } from "react-toastify";

const VoucherComponent = () => {
    const VOUCHER_IMGS_URL = "../assets/img/voucher"
    const { accountId, token } = useAuth();
    const [discounts, setDiscounts] = useState([])

    useEffect(
        () => {
            getAllDiscountCode(token).then(
                res => {
                    setDiscounts(
                        res.data
                    )
                }
            )
                .catch(
                    (err) => console.log(err)
                )
        },
        []
    )

    const saveToAccount = (id) => {
        addDiscountToAccount(token, accountId, id).then(
            toast.success("Saved, shop now?")
        )
            .then(
                error =>
                    console.log(error)
            )
    }



    return (
        <div className="container text-center">

            <div id="demo" class="carousel slide" data-ride="carousel">


                <ul class="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" class="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                </ul>


                <div class="carousel-inner">
                    <div class="carousel-item active" onClick={() => console.log("Hello")} >
                        <img className="rounded" src={VOUCHER_IMGS_URL + '/blackfriday.png'} style={{ width: '70%', height: 'auto' }} alt="Los Angeles" />
                    </div>
                    <div class="carousel-item">
                        <img className="rounded" src={`${VOUCHER_IMGS_URL}/voucherBg.png`} style={{ width: '80%', height: 'auto' }} alt="Chicago" />
                    </div>
                </div>


                <a class="carousel-control-prev" href="#demo" data-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </a>
                <a class="carousel-control-next" href="#demo" data-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </a>

            </div>


            <h1 className="mt-5 mb-5">Special Discount</h1>

            <div className="row mt-5 bg-primary">

                {
                    discounts.map(
                        d => (
                            <div key={d.id} className="row col-md-6" style={{ borderRight: "2px solid black" }}>
                                <img className="" style={{ borderRadius: "5%", marginLeft: "15px" }} src="https://static.thenounproject.com/png/4727320-200.png" alt="" />
                                <div className="col-md-7 mt-5">
                                    <h3>{d.id}</h3>
                                    <h4 className="text-dark">Sale {d.discountPercentage}%</h4>
                                    <h5>Đơn tối thiểu {d.condition}k</h5>
                                    <button className="btn btn-danger" onClick={() => saveToAccount(d.id)}>Save</button>
                                </div>
                            </div>
                        )
                    )
                }
            </div>


            <h1 className="mt-5 mb-5">Daily</h1>

            <div>

            </div>

        </div>
    )
}

export default VoucherComponent