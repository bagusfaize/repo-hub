import Image from "next/image";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";

export default function HomeView() {
  return (
    <main className="flex flex-col items-center justify-center px-10 sm:px-16 min-h-svh">
      <div className="grid grid-cols-12 sm:gap-5 w-full lg:w-3/5">
        <div className="col-span-12 sm:col-span-4 justify-start">
          <Image className="h-20 w-20 sm:h-52 sm:w-52" src="home-state.svg" alt="home-illustration" width="300" height="300" />
        </div>
        <div className="col-span-12 sm:col-span-8">
          <Logo />
          <h1 className="text-2xl sm:text-3xl mb-11 sm:mb-7 font-medium">
            Explore Github Users and Repositories
          </h1>
          <div className="w-full">
            <SearchBar />
          </div>
        </div>
      </div>
    </main>
  )
}
