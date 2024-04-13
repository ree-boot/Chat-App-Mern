import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const {setSelectedConversation} = useConversation();
  const { conversations } = useGetConversations();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearch(query);
    if (query.length >= 1) {
      const filteredConversations = conversations.filter((c) =>
        c.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredConversations);
    } else {
      setSearchResults([]);
    }
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    setSearch('');
    setSearchResults([]);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(!search) return;
  //   if(search.length < 3){
  //     return toast.error('Search term must be atleast 3 characters long');
  //   }

  //   const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
  //   if(conversation) {
  //     setSelectedConversation(conversation);
  //     setSearch('');
  //   } else toast.error('No such user found!');
  // };

//   return (
//     <form className='flex items-center gap-2'>
//         <input type="text" placeholder='Search...' className='input input-bordered rounded-full' 
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button onClick={handleSubmit} type='submit' className='btn btn-circle bg-sky-500 text-white'>
//             <IoSearchSharp className='w-6 h-6 outline-none' />
//         </button>
//     </form>
//   );
// };

return (
  <div className="relative">
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full w-full"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <IoSearchSharp className="text-white w-8 h-8" />
    </div>
    <div className="absolute bg-opacity-50 bg-white font-bold text-black w-full shadow-lg rounded-lg z-10">
      {searchResults.map((conversation) => (
        <div
          key={conversation.id}
          className="p-2 cursor-pointer rounded-lg hover:bg-blue-500"
          onClick={() => handleConversationClick(conversation)}
        >
          {conversation.fullName}
        </div>
      ))}
    </div>
  </div>
);
};

export default SearchInput;


//STARTER CODE
// import React from 'react';
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
//   return (
//     <form className='flex items-center gap-2'>
//         <input type="text" placeholder='Search...' className='input input-bordered rounded-full' />
//         <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
//             <IoSearchSharp className='w-6 h-6 outline-none' />
//         </button>
//     </form>
//   );
// };

// export default SearchInput;