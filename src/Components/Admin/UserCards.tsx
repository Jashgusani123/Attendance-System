import moreDark from '../../assets/moreDark.png'
const UserCard = ({ type , count , bgcolor}: { type: "admin" | "teacher" | "student" | "parent" , count:number , bgcolor: "bg-[#C3EBFA]" | "bg-amber-400"}) => {
  return (
    <div className={`rounded-2xl ${bgcolor} p-4 flex-1 min-w-[130px]`}>
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <img src={moreDark} alt="More Options" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{count}</h1> {/* Placeholder count */}
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default UserCard;
