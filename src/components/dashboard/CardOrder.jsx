import { CalendarOutlined } from "@ant-design/icons";

const CardOrder = ({ order }) => {
  return (
    <div className="group flex flex-col sm:flex-row items-center rounded-xl border bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg overflow-hidden">
      <div className="w-full sm:w-48 h-48 sm:h-auto sm:self-stretch relative overflow-hidden">
        <img
          className="w-full h-full transform object-cover transition-transform duration-300 group-hover:scale-105"
          src={order.thumbnail}
          alt={order.title}
        />
      </div>
      <div className="flex-1 p-5">
        <h3 className="text-lg font-semibold text-gray-800 ">{order.title}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <CalendarOutlined className="mr-2" />
          <span>Purchased on: {order.purchaseDate}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">${order.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CardOrder;
