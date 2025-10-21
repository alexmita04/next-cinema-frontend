import WalletTicket from "@/components/items/WalletTicket";

const userData = {
  username: "alexmita04",
  dateOfBirth: "2004-06-12",
  gender: "Male",
  phoneNumber: "123456789",
  address: "1234 Main Street Los Angeles, CA 90012",
  isAdmin: false,
};

const tickets = [
  {
    screening: {
      auditorium: "Auditorium 1",
      movie: {
        title: "Saving Private Ryan",
        coverImage:
          "https://resizing.flixster.com/w3n4-6BPPmegOYfBinbTgvms7Uk=/206x305/v2/https://resizing.flixster.com/e4XDrbw7Fd7VYePV7cxB8sQV3eA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzc1MDczNGJlLWNjN2EtNGIxMS1iOWM5LWJjYTUwODk4MzA5Yy53ZWJw",
      },
      cinema: "Cinema X",

      date: "2025-10-10",
      startTime: 13,
    },
    seat: {
      row: 4,
      number: 5,
    },
  },
  {
    screening: {
      auditorium: "Auditorium 1",
      movie: {
        title: "Saving Private Ryan",
        coverImage:
          "https://resizing.flixster.com/w3n4-6BPPmegOYfBinbTgvms7Uk=/206x305/v2/https://resizing.flixster.com/e4XDrbw7Fd7VYePV7cxB8sQV3eA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzc1MDczNGJlLWNjN2EtNGIxMS1iOWM5LWJjYTUwODk4MzA5Yy53ZWJw",
      },
      cinema: "Cinema X",

      date: "2025-10-10",
      startTime: 13,
    },
    seat: {
      row: 4,
      number: 5,
    },
  },
  {
    screening: {
      auditorium: "Auditorium 1",
      movie: {
        title: "Saving Private Ryan",
        coverImage:
          "https://resizing.flixster.com/w3n4-6BPPmegOYfBinbTgvms7Uk=/206x305/v2/https://resizing.flixster.com/e4XDrbw7Fd7VYePV7cxB8sQV3eA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzc1MDczNGJlLWNjN2EtNGIxMS1iOWM5LWJjYTUwODk4MzA5Yy53ZWJw",
      },
      cinema: "Cinema X",

      date: "2025-10-10",
      startTime: 13,
    },
    seat: {
      row: 4,
      number: 5,
    },
  },
  {
    screening: {
      auditorium: "Auditorium 1",
      movie: {
        title: "Saving Private Ryan",
        coverImage:
          "https://resizing.flixster.com/w3n4-6BPPmegOYfBinbTgvms7Uk=/206x305/v2/https://resizing.flixster.com/e4XDrbw7Fd7VYePV7cxB8sQV3eA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzc1MDczNGJlLWNjN2EtNGIxMS1iOWM5LWJjYTUwODk4MzA5Yy53ZWJw",
      },
      cinema: "Cinema X",

      date: "2025-10-10",
      startTime: 13,
    },
    seat: {
      row: 4,
      number: 5,
    },
  },
  {
    screening: {
      auditorium: "Auditorium 1",
      movie: {
        title: "Saving Private Ryan",
        coverImage:
          "https://resizing.flixster.com/w3n4-6BPPmegOYfBinbTgvms7Uk=/206x305/v2/https://resizing.flixster.com/e4XDrbw7Fd7VYePV7cxB8sQV3eA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzc1MDczNGJlLWNjN2EtNGIxMS1iOWM5LWJjYTUwODk4MzA5Yy53ZWJw",
      },
      cinema: "Cinema X",
      date: "2025-10-10",
      startTime: 13,
    },
    seat: {
      row: 4,
      number: 5,
    },
  },
];

const UserProfile = () => {
  return (
    <>
      <div className="border-3 border-black p-10 rounded-lg mt-10 mb-10 text-sm md:text-lg">
        <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl mb-5">
          Profile Information
        </h1>
        <p className="pb-2 border-b-2 mb-5">
          <span className="font-bold">Username:</span> {userData.username}
        </p>
        <p className="pb-2 border-b-2 mb-5">
          <span className="font-bold">Date of Birth:</span>{" "}
          {userData.dateOfBirth}
        </p>
        <p className="pb-2 border-b-2 mb-5">
          {" "}
          <span className="font-bold">Gender:</span> {userData.gender}
        </p>
        <p className="pb-2 border-b-2 mb-5">
          {" "}
          <span className="font-bold">Phone Number:</span>{" "}
          {userData.phoneNumber}
        </p>
        <p className="pb-2 border-b-2">
          {" "}
          <span className="font-bold">Address:</span> {userData.address}
        </p>
      </div>
      <div className="border-3 border-black p-10 rounded-lg mb-10">
        <h2 className="text-5xl font-bold mb-10">Wallet</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {tickets.map((ticketEl, index) => {
            return <WalletTicket key={index} ticket={ticketEl} />;
          })}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
