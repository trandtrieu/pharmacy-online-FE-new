import React, { Component } from 'react'
import ProductServices from '../services/ProductServices';

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
            <div className='container'>
                <h2 className="text-center">Product List</h2>
                <div className="row">
                    <button className="btn btn-primary col-md-2" onClick={this.addProduct}> Add Product</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr style={{ textAlign: 'center' }}>
                                <th> PRODUCT IMAGE</th>
                                <th> PRODUCT NAME</th>
                                <th> PRODUCT BRAND</th>
                                <th> PRODUCT PRICE</th>
                                <th> ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(
                                    product =>
                                        <tr key={product.productId}>
                                            <td style={{ width: '15%' }}><img style={{ width: '100%' }} src={`/assets/images/${product.imageUrls[0]}`} alt="" srcSet="" /></td>
                                            <td> {product.name} </td>
                                            <td> {product.brand}</td>
                                            <td> {product.price}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <button onClick={() => this.editProduct(product.productId)} className="btn btn-info">Update</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteProduct(product.productId)} className="btn btn-danger">Delete </button>
                                                <button type='button' data-toggle="modal" data-target={`#myModal${product.productId}`} style={{ marginLeft: "10px" }} className="btn btn-info">View </button>
                                            </td>
                                        </tr>


                                )
                            }

                        </tbody>
                        {
                            this.state.products.map(
                                product =>
                                    <div class="container">
                                        <div key={product.productId} class="modal fade modal-lg" style={{
                                            maxWidth: '800px',
                                            width: '80%',
                                            margin: '0 auto',
                                            marginTop: '5%'
                                        }} id={`myModal${product.productId}`} role="dialog">
                                            <div class="modal-dialog">

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


                </div >

            </div >
        )
    }
}

export default ListProductComponent