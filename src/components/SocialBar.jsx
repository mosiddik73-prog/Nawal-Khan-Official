import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const socialItems = [
  {
    name: "YouTube",
    icon: FaYoutube,
    href: "#videos",
    iconClass: "text-red-500",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "#instagram",
    iconClass: "text-pink-400",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "#facebook",
    iconClass: "text-blue-400",
  },
];

function SocialBar() {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/70 p-1.5 shadow-2xl backdrop-blur-2xl">
        {socialItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href={item.href}
              aria-label={item.name}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-transparent transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/10 sm:h-12 sm:w-12"
            >
              <Icon
                className={`text-[20px] transition-transform duration-300 group-hover:scale-110 sm:text-[21px] ${item.iconClass}`}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default SocialBar;