import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <header className="border-b border-purple-600 sticky top-0 bg-transparent">
      <div className=": bg-purple-600 text-slate-50 flex justify-center">
        <p className=" text-sm">O melhor marketplace no menor frasco.</p>
      </div>
      <div className="bg-purple-200 dark:bg-zinc-800">
        <Navbar />
      </div>
    </header>
  );
};
