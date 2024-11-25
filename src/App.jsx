/* eslint-disable no-unused-vars */
import NavBar from "./Components/NavBar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./Config/firebase";
import ContactCard from "./Components/ContactCard";
import AddandUpdate from "./Components/AddandUpdate";
import useDisclose from "../hooks/useDisclose";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [contacts, setContacts] = useState([]);
  const {isOpen,onClose,onOpen} = useDisclose();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "Contacts");
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contactLists);
          return contactLists;
        })
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
  const filterContacts = (e) => {
    const value = e.target.value;
    try {
      const contactsRef = collection(db, "Contacts");
      onSnapshot(contactsRef,(snapshot)=>{
        const contactLists = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const FilteredContacts = contactLists.filter((contact) => 
          contact.name.toLowerCase().includes(value.toLowerCase())
        )
        setContacts(FilteredContacts);
        return FilteredContacts;
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mx-auto max-w-[370px] px-4">
      <NavBar />
      <div className="flex gap-2 flex-grow">
        <div className="relative flex item-center flex-grow">
          <FiSearch  className="ml-1 absolute text-white text-3xl" />
          <input
            onChange={filterContacts}
            type="text"
            className="flex-grow border bg-transparent border-white rounded-md h-10 text-white pl-9"
          />
        </div>
        <div>
          <AiFillPlusCircle onClick={onOpen} className="text-white text-5xl cursor-pointer" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {contacts.map((contact) => (
         <ContactCard key={contact.id} contact={contact}/>
        ))}
      </div>
      <AddandUpdate onClose={onClose} isOpen={isOpen}></AddandUpdate>
      <ToastContainer position="bottom-center"/>
    </div>
  );
}

export default App;
