import React, { Component } from 'react'
import ProductServices from '../services/ProductServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faEye,
    faTrash,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
class ListProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
        this.addProduct = this.addProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    deleteProduct(id) {
        ProductServices.deleteProduct(id).then((res) => {
            this.setState({ products: this.state.products.filter(product => product.productId !== id) });
        });
    }

    editProduct(id) {
        this.props.history.push(`/add-product/${id}`);
    }

    componentDidMount() {
        ProductServices.getProducts().then((res) => {
            this.setState({ products: res.data });
        });
    }

    addProduct() {
        this.props.history.push('/add-product/_add');
    }

    render() {
        return (
            <div class="container-xl">
                <div class="table-responsive">
                    <div class="table-wrapper">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h2>Manage <b>Products</b></h2>
                                </div>
                                <div class="col-sm-6">
                                    <a onClick={this.addProduct} class="btn btn-success" data-toggle="modal"><i
                                        class="material-icons"><FontAwesomeIcon icon={faPlus} /></i> <span style={{ marginTop: '0' }}>Add New Product</span></a>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped table-hover">
                            <span></span>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Image</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product =>
                                            <tr key="{product.productId}">
                                                <td><img style={{ width: '100%' }} src={`/assets/images/${product.imageUrls[0]}`} alt=""
                                                    srcSet="" /></td>
                                                <td>{product.name}</td>
                                                <td> {product.brand}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <a onClick={() => this.editProduct(product.productId)} className=""><span><FontAwesomeIcon icon={faPenToSquare} /></span></a>
                                                    <a style={{ marginLeft: "10px" }} onClick={() =>
                                                        this.deleteProduct(product.productId)} className=""><span><FontAwesomeIcon icon={faTrash} /></span></a>
                                                    <a type='button' data-toggle="modal" data-target={`#myModal${product.productId}`}
                                                        style={{ marginLeft: "10px" }} className=""><span><FontAwesomeIcon icon={faEye} /></span></a>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                            {
                                this.state.products.map(
                                    product =>
                                        <div class="container">
                                            <div key={product.productId} class="modal fade modal-lg " style={{
                                                maxWidth: '1000px',
                                                width: '100p0x',
                                                margin: '0 auto',
                                                marginTop: '5%',
                                                paddingRight: '0'
                                            }} id={`myModal${product.productId}`} role="dialog">
                                                <div style={{ maxWidth: '700px' }} class="modal-dialog">

                                                    {/* <!-- Modal content--> */}
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                            <h4 class="modal-title"></h4>
                                                        </div>
                                                        <div class="modal-body">
                                                            <table>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>Brand</th>
                                                                    <th>Price</th>
                                                                    <th>Component</th>
                                                                    <th>Guide</th>
                                                                    <th>Instruction</th>
                                                                    <th>Made in</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>{product.name}</td>
                                                                    <td>{product.brand}</td>
                                                                    <td>{product.price}</td>
                                                                    <td>{product.component}</td>
                                                                    <td>{product.guide}</td>
                                                                    <td>{product.instruction}</td>
                                                                    <td>{product.madeIn}</td>
                                                                </tr>
                                                            </table>
                                                            <p><strong>Object: </strong>{product.object}</p>
                                                            <p><strong>Preservation: </strong>{product.preservation}</p>
                                                            <p><strong>Store: </strong>{product.store}</p>
                                                            <p><strong>Virtue: </strong>{product.virtue}</p>


                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                )
                            }
                        </table>
                        <div class="clearfix">
                            <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                            <ul class="pagination">
                                <li class="page-item disabled"><a href="#">Previous</a></li>
                                <li class="page-item"><a href="#" class="page-link">1</a></li>
                                <li class="page-item"><a href="#" class="page-link">2</a></li>
                                <li class="page-item active"><a href="#" class="page-link">3</a></li>
                                <li class="page-item"><a href="#" class="page-link">4</a></li>
                                <li class="page-item"><a href="#" class="page-link">5</a></li>
                                <li class="page-item"><a href="#" class="page-link">Next</a></li>
                            </ul>
                        </div>

                    </div>

                </div>

            </div >

        )

    }
}

export default ListProductComponent