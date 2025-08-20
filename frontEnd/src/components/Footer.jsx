const Footer = () => {
  return (
    <footer className="bg-fuchsia-400 p-4 bottom-0 w-full  ">
      <div className="container mx-auto text-center">
        <p className="text-white">
          &copy; {new Date().getFullYear()} KidsCareHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
