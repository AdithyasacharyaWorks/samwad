import ButtonToNavabar from "./ButtonToNavbar";
const Navbar = () => {
  return (
    <div className='sticky top-0 z-50'>
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            
            <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Samwad Admin</h1>
              <ButtonToNavabar/>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
