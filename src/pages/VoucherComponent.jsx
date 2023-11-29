import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { getAllDiscountCodeById, getAllDiscountCode, addDiscountToAccount } from "../services/VoucherService";
import { toast } from "react-toastify";
import ReactModal from "react-modal";

const VoucherComponent = () => {
    const VOUCHER_IMGS_URL = "../assets/img/voucher"
    const { accountId, token } = useAuth();
    const [discounts, setDiscounts] = useState([])
    const [isOpen, setIsOpone] = useState(false)
    const [currentDiscountId, setCurrentDiscountId] = useState()

    const customStyles = {
        content: {
            top: "35%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            width: "30%",
            transform: "translate(-40%, -10%)",
        },
    };

    const modelOpen = id => {
        setIsOpone(!isOpen)
        setCurrentDiscountId(id)
    }

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
        <div className="container-fluid text-center">

            <img src={`${VOUCHER_IMGS_URL}/vouchervip.jpg`} className="rounded" width="90%" alt="" />

            <h1 className="mt-5 mb-5">Special Discount</h1>

            <div className="row m-5 bg-primary pb-3">
                {
                    discounts.map(
                        d => (
                            <div key={d.id} className="row col-md-6">
                                <img className="col-md-4 ml-4" src="https://static.thenounproject.com/png/4727320-200.png" alt="" />
                                <div className="col-md-7 mt-4">
                                    <h3>{d.id}</h3>
                                    <h4 className="text-dark">Sale {d.discountPercentage}%</h4>
                                    <h5>Đơn tối thiểu {d.condition}k</h5>
                                    <button className="btn btn-danger" onClick={() => saveToAccount(d.id)}>Save</button>
                                    <button className="btn btn-warning" onClick={() => modelOpen(d.id)}>Details</button>
                                </div>
                            </div>
                        )
                    )
                }
            </div>

            <ReactModal isOpen={isOpen} style={customStyles}>
                {discounts.map((discount) => {
                    if (discount.id === currentDiscountId) {
                        return (
                            <div key={discount.id} className='container-fluid'>
                                <h3>{discount.id}</h3>
                                <h3>{discount.code}</h3>
                                <h3>{discount.condition}</h3>
                                <h3>{discount.expiryDate}</h3>
                            </div>
                        );
                    }
                    return null;
                })}
                <button style={{ float: "right" }} onClick={() => modelOpen(null)} className='btn btn-primary '>Close</button>
            </ReactModal>

        </div>
    )
}

export default VoucherComponent