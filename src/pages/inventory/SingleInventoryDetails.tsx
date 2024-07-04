import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SingleInventoryDetails = () => {
  const { id } = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const [gadget, setgadget]: any = useState([]);
  useEffect(() => {
    setIsLoad(true);
    fetch(`https://gadgets-server-side.vercel.app/gadgets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setgadget(data);
        setIsLoad(false);
      })
      .catch(() => setIsLoad(false));
  }, []);

  // console.log("first", gadget);
  const {
    product_name,
    brand,
    category,
    product_img,
    model_number,
    operating_system,
    price,
    quantity,
    release_year,
    connectivity,
    features,
    power_source,
    createdBy
  } = gadget;
  if (isLoad)
    return (
      <div className="toast toast-center toast-middle">
        <div className="alert alert-success">
          <span>Loading...</span>
        </div>
      </div>
    );

  return (
    <>
      <div className="hero bg-base-200  mb-24 py-5">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold inline">
              Inventory: {gadget?.product_name}
            </h1>
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row justify-start gap-32 items-center">
          <img src={product_img} className="w-80 rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-3xl font-bold mb-8">{product_name}</h1>
            <p className="mb-2 font-semibold">Price: ${price}</p>
            <p className="mb-2 font-semibold">Brand: {brand}</p>
            <p className="mb-2 font-semibold">Category: {category}</p>
            <p className="mb-2 font-semibold">Model number: {model_number}</p>
            <p className="mb-2 font-semibold">
              Operating system: {operating_system}
            </p>
            <p className="mb-2 font-semibold">Available Quantity: {quantity}</p>
            <p className="mb-2 font-semibold">Release year: {release_year}</p>
            <p className="mb-5 font-semibold">Created by: {createdBy}</p>
          </div>
        </div>
      </div>

      {/* features */}
      <div className="flex flex-col mx-auto justify-center items-center">
        <div>
          {" "}
          <div className="max-w-7xl mx-7 text-center mt-5 lg:flex lg:flex-wrap lg:items-center">
            <span className="me-5 -mt-4">Features:</span>
            {features != null &&
              features?.map((feature: any, index: number) => {
                return (
                  <p key={index + 123} className="btn btn-outline me-3 mb-3">
                    {feature}
                  </p>
                );
              })}
          </div>
          <div className="max-w-7xl mx-7 text-center mt-5 lg:flex lg:flex-wrap lg:items-center">
            <span className="me-5 -mt-4">Power Source:</span>
            {power_source != null &&
              power_source?.map((feature: any, index: number) => {
                return (
                  <p key={index + 1234} className="btn btn-outline me-3 mb-3">
                    {feature}
                  </p>
                );
              })}
          </div>
          <div className="max-w-7xl mx-7 text-center mt-5 lg:flex lg:flex-wrap lg:items-center">
            <span className="me-5 -mt-4">Connectivity:</span>
            {connectivity != null &&
              connectivity?.map((feature: any, index: number) => {
                return (
                  <p key={index + 12345} className="btn btn-outline me-3 mb-3">
                    {feature}
                  </p>
                );
              })}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};
export default SingleInventoryDetails;
