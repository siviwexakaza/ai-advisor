import Image from "next/image";

const teamMembers = [
  {
    name: "Siviwe Xakaza",
    title: "Software Engineer",
    imageUrl:
      "https://yt3.googleusercontent.com/ytc/AIdro_nipfkxJpTQS9ACC3Im-QvxD4r0We4q3oGv3eJ1ESo-FZk=s900-c-k-c0x00ffffff-no-rj",
  },
];
const Team01Page = () => {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto">
        {/* <b className="text-center text-muted-foreground font-semibold text-base">
          We&apos;re hiring!
        </b> */}
        <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
          Meet Our Team
        </h2>
        <p className="mt-4 text-base sm:text-lg">
          Our philosophy is simple — build great software that makes the world a
          better place.
        </p>
      </div>

      <div className="mt-20 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 max-w-screen-lg mx-auto">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-center">
            <Image
              src={member.imageUrl}
              alt={member.name}
              className="h-20 w-20 rounded-full object-cover mx-auto bg-secondary"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team01Page;
