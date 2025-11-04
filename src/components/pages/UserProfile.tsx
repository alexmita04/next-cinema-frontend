import WalletTicket from "@/components/items/WalletTicket";
import ApiClient from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { type UserInterface, type TicketInterface } from "@/lib/backendTypes";
import CustomSpinner from "@/components/items/CustomSpinner";

const userData = {
  username: "alexmita04",
  dateOfBirth: "2004-06-12",
  gender: "Male",
  phoneNumber: "123456789",
  address: "1234 Main Street Los Angeles, CA 90012",
  isAdmin: false,
};

const UserProfile = () => {
  const [user, setUser] = useState<null | UserInterface>(null);
  const [tickets, setTickets] = useState<null | TicketInterface[]>(null);

  // fetch user information
  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await ApiClient.get("/users/profile");

        if (isMounted) {
          setUser(response.data.data.profileInformation);
        }
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchTickets = async () => {
      try {
        const response = await ApiClient.get("/users/profile/tickets");

        if (isMounted) {
          if (isMounted) {
            const fetchedTickets = response.data.data.tickets;
            setTickets(fetchedTickets);
          }
        }
      } catch (err) {
        console.log(err);
        setTickets(null);
      }
    };

    fetchTickets();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="border-3 border-black p-10 rounded-lg mt-10 mb-10 text-sm md:text-lg">
        <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl mb-5">
          Profile Information
        </h1>
        {user === null ? (
          <CustomSpinner size={4} />
        ) : (
          <>
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
          </>
        )}
      </div>
      <div className="border-3 border-black p-10 rounded-lg mb-10">
        <h2 className="text-5xl font-bold mb-10">Wallet</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {tickets === null ? (
            <CustomSpinner size={4} />
          ) : (
            <>
              {tickets.length === 0 && <p>No tickets</p>}
              {tickets.map((ticketEl, index) => {
                return <WalletTicket key={index} ticket={ticketEl} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
