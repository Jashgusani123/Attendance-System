const InnerNavbar = ({ Components, Name }: { Components?: any; Name: string }) => {
    return (
      <nav className="bg-zinc-300 rounded-[10px] sticky top-2 z-40 w-full flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-3 gap-3 mb-4">
        <h1 className="text-2xl font-bold text-zinc-800">{Name}</h1>
        <div className="w-full md:w-auto">{Components}</div>
      </nav>
    );
  };
  
  export default InnerNavbar;
  