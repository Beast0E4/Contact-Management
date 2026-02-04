import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchContacts, deleteContact, setSearchTerm } from '../redux/slices/contactSlice';
import { logout } from '../redux/slices/authSlice';

import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ViewModal from '../components/ViewModal';
import DeleteModal from '../components/DeleteModal';
import ContactCardGrid from '../components/ContactCardGrid';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { filteredContacts, loading, searchTerm, contacts: allContacts } = useSelector((state) => state.contacts);

  const [viewingContact, setViewingContact] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteContact(id));
    setShowDeleteConfirm(null);
    setViewingContact(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={authState.data} onLogout={() => { dispatch(logout()); navigate('/login'); }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearch={(e) => dispatch(setSearchTerm(e.target.value))} 
          onAdd={() => navigate('/contacts/new')} 
          count={filteredContacts.length}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <ContactCardGrid
            contacts={filteredContacts} 
            onView={setViewingContact} 
            onEdit={(id) => navigate(`/contacts/edit/${id}`)}
            onDelete={setShowDeleteConfirm}
          />
        )}
      </main>

      {viewingContact && <ViewModal contact={viewingContact} onClose={() => setViewingContact(null)} />}
      {showDeleteConfirm && (
        <DeleteModal 
          onClose={() => setShowDeleteConfirm(null)} 
          onConfirm={() => handleDelete(showDeleteConfirm)} 
        />
      )}
    </div>
  );
};

export default Dashboard;