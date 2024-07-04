import { Link } from "react-router-dom";

const SingleInventory = ({ gadget, handleDelete, handleClick }: any) => {
  const { _id, product_name, price, quantity, product_img } = gadget;

  return (
    <>
      <tr>
        <td>
          <div className="avatar">
            <div className="lg:w-20 md:w-20 w-16 rounded">
              <img src={product_img} />
            </div>
          </div>
        </td>
        <td>{product_name}</td>
        <td>{quantity}</td>
        <td>
          <p>$ {price}</p>
        </td>
        <td>
          <Link to={`/inventory/gadget/${_id}`}>
            <button className="btn">View Details</button>
          </Link>
        </td>
        <td>
          <Link to={`/inventory/gadget/update/${_id}`}>
            <button className="btn btn-primary-content">Update</button>
          </Link>
        </td>
        <td>
          <Link to={`/inventory/gadget/duplicate/${_id}`}>
            <button className="btn btn-primary-content">
              Duplicate & Edit
            </button>
          </Link>
        </td>
        <td>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-primary-content"
          >
            Delete Now
          </button>
        </td>
        <td>
          <input
            type="checkbox"
            className="checkbox"
            onClick={() => handleClick(_id)}
          />
        </td>
      </tr>
    </>
  );
};
export default SingleInventory;
