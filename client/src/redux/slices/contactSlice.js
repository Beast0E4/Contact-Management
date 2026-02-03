import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/contacts");
      return response.data.contacts || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch contacts"
      );
    }
  }
);

export const createContact = createAsyncThunk(
  "contacts/create",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/contacts", contactData);
      return response.data.contact;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create contact"
      );
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/contacts/${id}`, data);
      return response.data.contact;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update contact"
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete contact"
      );
    }
  }
);

const initialState = {
  contacts: [],
  filteredContacts: [],
  loading: false,
  error: null,
  searchTerm: "",
};

const filterContacts = (
  contacts,
  searchTerm,
) => {
  let result = [...contacts];

  if (searchTerm) {
    result = result.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone?.includes(searchTerm)
    );
  }

  return result;
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredContacts = filterContacts(
        state.contacts,
        action.payload,
      );
    },
    setSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
      state.filteredContacts = filterContacts(
        state.contacts,
        state.searchTerm,
        action.payload,
      );
    },
    clearFilters: (state) => {
      state.searchTerm = "";
      state.filteredContacts = state.contacts;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
        state.filteredContacts = filterContacts(
          action.payload,
          state.searchTerm,
        );
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.unshift(action.payload);
        state.filteredContacts = filterContacts(
          state.contacts,
          state.searchTerm,
        );
      })

      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
        state.filteredContacts = filterContacts(
          state.contacts,
          state.searchTerm,
        );
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (c) => c._id !== action.payload
        );
        state.filteredContacts = filterContacts(
          state.contacts,
          state.searchTerm,
        );
      })

      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.contacts = state.contacts.map((c) =>
          c._id === action.payload._id ? action.payload : c
        );
        state.filteredContacts = filterContacts(
          state.contacts,
          state.searchTerm,
        );
      });
  },
});

export const {
  setSearchTerm,
  clearFilters,
} = contactSlice.actions;

export default contactSlice.reducer;
