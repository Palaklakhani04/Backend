/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const buttonLogicService = (setRenderData, setOpen) => {
  // Show book pages more than 100
  const showBookPagesMoreThan100 = async () => {
    const filterData = await axios.get(
      "http://localhost:3000/books/noOfPage?gt=100"
    );
    setRenderData(filterData.data);
  };

  // Show All
  const showAll = async () => {
    const allData = await axios.get("http://localhost:3000/books");
    setRenderData(allData.data);
  };

  // show book pages less than 90 more than 25
  const showBookPagesLessThan90MoreThan25 = async () => {
    const filterData = await axios.get(
      "http://localhost:3000/books/noOfPage?gt=25&lt=90"
    );
    setRenderData(filterData.data);
  };

  // show book pages less than 90 more than 25 not 80
  const showBookPagesLessThan90MoreThan25Not80 = async () => {
    const filterData = await axios.get(
      "http://localhost:3000/books/noOfPage?gt=25&lt=90&ne=80"
    );
    setRenderData(filterData.data);
  };

  // Show book with 0 page
  const showBookWith0Page = async () => {
    const filterData = await axios.get("http://localhost:3000/books/noOfPage?noOfPage=0");
    setRenderData(filterData.data);
  };

  // Show book by release year
  const showBookByReleaseYear = async () => {
    const filterData = await axios.get("http://localhost:3000/books/releasedYear?gt=2001&lt=2015");
    const filteredData = filterData.data.filter(
      (book) => book.releasedYear === 2001 || book.releasedYear === 2015
    );
    setRenderData(filteredData);
  };

  // Sort By Name
  const sortByName = async () => {
    const sortedData = await axios.get(
      "http://localhost:3000/books/bookName"
    );
    setRenderData(sortedData.data);
  };

  // Sort by Book Price
  const sortByBookPrice = async () => {
    const sortedData = await axios.get(
      "http://localhost:3000/books/bookPrice"
    );
    setRenderData(sortedData.data);
  };

  // Sort By Book Author
  const sortByBookAuthor = async () => {
    const sortedData = await axios.get(
      "http://localhost:3000/books/bookAuthor"
    );
    setRenderData(sortedData.data);
  };

  // Sort By No of Pages
  const sortByNoOfPages = async () => {
    const sortedData = await axios.get(
      "http://localhost:3000/books/noOfPage"
    );
    setRenderData(sortedData.data);
  };

  // Sort By Book Category
  const sortByBookCategory = async () => {
    const sortedData = await axios.get(
      "http://localhost:3000/books/bookCategory"
    );
    setRenderData(sortedData.data);
  };

  // Sort By Release Year
  const sortByReleaseYear = async () => {
    const sortedData = await axios.get(
      "http://localhost:3000/books/releasedYear"
    );
    setRenderData(sortedData.data);
  };

  //Show Book By Id
  const [showBookByIdDialog, setShowBookByIdDialog] = useState(false);

  const handleShowBookById = () => {
    setShowBookByIdDialog(true);
  };

  const handleShowBookByIdClose = () => {
    setShowBookByIdDialog(false);
  };

  const handleSubmitShowBookById = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookId = formJson.bookId;
    try {
      const filteredData = await axios.get(
        `http://localhost:3000/books/id?id=${bookId}`
      );
      filteredData.data.id ? setRenderData([filteredData.data]) : setOpen(true);
    } catch (error) {
      console.log(error);
      setOpen(true);
    }
    handleShowBookByIdClose();
  };

  //Show book by name
  const [showBookByNameDialog, setShowBookByNameDialog] = useState(false);

  const handleShowBookByName = () => {
    setShowBookByNameDialog(true);
  };

  const handleShowBookByNameClose = () => {
    setShowBookByNameDialog(false);
  };

  const handleSubmitShowBookByName = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookName = formJson.bookName;

    const filteredData = await axios.get(
      `http://localhost:3000/books/bookName?bookName=${bookName}`
    );
    filteredData.data.id
      ? setRenderData([filteredData.data])
      : setOpen(true);
    handleShowBookByNameClose();
  };

  // Show book by name and author
  const [showBookByNameAndAuthorDialog, setShowBookByNameAndAuthorDialog] = useState(false);

  const handleShowBookByNameAndAuthor = () => {
    setShowBookByNameAndAuthorDialog(true);
  };

  const handleShowBookByNameAndAuthorClose = () => {
    setShowBookByNameAndAuthorDialog(false);
  };

  const handleSubmitShowBookByNameAndAuthor = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookName = formJson.bookName;
    const bookAuthor = formJson.bookAuthor;

    const filteredData = await axios.get(
      `http://localhost:3000/books/bookName&bookAuthor?bookName=${bookName}&bookAuthor=${bookAuthor}`
    );
    filteredData.data.length > 0
      ? setRenderData(filteredData.data)
      : setOpen(true);
    handleShowBookByNameAndAuthorClose();
  };

  //   Delete Book By Id
  const [deleteBookByIdDialog, setDeleteBookByIdDialog] = useState(false);

  const handleDeleteBookById = () => {
    setDeleteBookByIdDialog(true);
  };

  const handleDeleteBookByIdClose = () => {
    setDeleteBookByIdDialog(false);
  };

  const handleSubmitDeleteBookById = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookId = formJson.bookId;

    try {
      const checkData = await axios.get(`http://localhost:3000/books/id?id=${bookId}`);
      if (checkData.data.id) {
        await axios.delete(`http://localhost:3000/books/id?id=${bookId}`);
        toast.success('Successfull')
        showAll()
      }
      else{
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      setOpen(true);
    }

    handleDeleteBookByIdClose();
  };

  //   Delete Book By Name
  const [deleteBookByNameDialog, setDeleteBookByNameDialog] = useState(false);

  const handleDeleteBookByName = () => {
    setDeleteBookByNameDialog(true);
  };

  const handleDeleteBookByNameClose = () => {
    setDeleteBookByNameDialog(false);
  };

  const handleSubmitDeleteBookByName = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookName = formJson.bookName;

    try {
      const checkData = await axios.get(
        `http://localhost:3000/books/bookName?bookName=${bookName}`
      );
      if (checkData.data.id) {
        await axios.delete(
          `http://localhost:3000/books/id?id=${checkData.data.id}`
        );
        toast.success('Successfull')
        showAll()
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      setOpen(true);
    }
    handleDeleteBookByNameClose();
  };

  //   delete Book By Desc And Author
  const [deleteBookByDescAndAuthorDialog, setDeleteBookByDescAndAuthorDialog] = useState(false);

  const handleDeleteBookByDescAndAuthor = () => {
    setDeleteBookByDescAndAuthorDialog(true);
  };

  const handleDeleteBookByDescAndAuthorClose = () => {
    setDeleteBookByDescAndAuthorDialog(false);
  };

  const handleSubmitDeleteBookByDescAndAuthor = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookAuthor = formJson.bookAuthor;
    const bookDesc = formJson.bookDesc;

    try {
      const checkData = await axios.get(
        `http://localhost:3000/books/bookDesc&bookAuthor?bookDesc=${bookDesc}&bookAuthor=${bookAuthor}`
      );
      if (checkData.data.length > 0) {
        await axios.delete(
          `http://localhost:3000/books/id?id=${checkData.data.id}`
        );
        toast.success('Successfull')
        showAll()
      } else {
        setOpen(true);
      }
    } catch (error) {
      setOpen(true);
      console.log(error);
    }

    handleDeleteBookByDescAndAuthorClose();
  };

  // delete Book By Name And Category
  const [deleteBookByNameAndCategory, setDeleteBookByNameAndCategory] = useState(false);

  const handleDeleteBookByNameAndCategory = () => {
    setDeleteBookByNameAndCategory(true);
  };

  const handleDeleteBookByNameAndCategoryClose = () => {
    setDeleteBookByNameAndCategory(false);
  };

  const handleSubmitDeleteBookByNameAndCategory = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookName = formJson.bookName;
    const bookCategory = formJson.bookCategory;

    try {
      const checkData = await axios.get(
        `http://localhost:3000/books/bookName&bookCategory?bookName=${bookName}&bookCategory=${bookCategory}`
      );
      if (checkData.data.length > 0) {
        await axios.delete(
          `http://localhost:3000/books/id?id=${checkData.data[0].id}`
        );
        toast.success('Successfull')
        showAll()
      } else {
        setOpen(true);
      }
    } catch (error) {
      setOpen(true);
      console.log(error);
    }
    handleDeleteBookByNameAndCategoryClose();
  };

  // update Book By Name
  const [updateBookByName, setUpdateBookByName] = useState(false);

  const handleUpdateBookByName = () => {
    setUpdateBookByName(true);
  };

  const handleUpdateBookByNameClose = () => {
    setUpdateBookByName(false);
  };

  const handleSubmitUpdateBookByName = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookOldName = formJson.bookOldName;
    const bookNewName = formJson.bookNewName;

    try {
      const checkData = await axios.get(
        `http://localhost:3000/books/bookName?bookName=${bookOldName}`
      );
      if (checkData.data.id) {
        await axios.put(`http://localhost:3000/books/bookName?bookName=${checkData.data.bookName}`, {
          ...checkData.data[0],
          bookName: bookNewName,
        });
        toast.success('Successfull')
        showAll()
      } else {
        setOpen(true);
      }
    } catch (error) {
      setOpen(true);
      console.log(error);
    }

    handleUpdateBookByNameClose();
  };

  // update Book By Name And Author
  const [updateBookByNameAndAuthor, setUpdateBookByNameAndAuthor] = useState(false);

  const handleUpdateBookByNameAndAuthor = () => {
    setUpdateBookByNameAndAuthor(true);
  };

  const handleUpdateBookByNameAndAuthorClose = () => {
    setUpdateBookByNameAndAuthor(false);
  };

  const handleSubmitUpdateBookByNameAndAuthor = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const bookOldName = formJson.bookOldName;
    const bookNewName = formJson.bookNewName;
    const bookOldAuthor = formJson.bookOldAuthor;
    const bookNewAuthor = formJson.bookNewAuthor;

    try {
      const checkData = await axios.get(
        `http://localhost:3000/books/bookName&bookAuthor?bookName=${bookOldName}&bookAuthor=${bookOldAuthor}`
      );
      if (checkData.data.length > 0) {
        await axios.put(`http://localhost:3000/books/bookName&bookAuthor?bookName=${bookOldName}&bookAuthor=${bookOldAuthor}`, {
          ...checkData.data[0],
          bookName: bookNewName,
          bookAuthor: bookNewAuthor,
        });
        toast.success('Successfull')
        showAll()
      } else {
        setOpen(true)
      }
    } catch (error) {
        setOpen(true)
        console.log(error);
    }
    handleUpdateBookByNameAndAuthorClose();
  };

  return {
    showBookPagesMoreThan100,
    showAll,
    showBookPagesLessThan90MoreThan25,
    showBookPagesLessThan90MoreThan25Not80,
    showBookWith0Page,
    showBookByReleaseYear,
    sortByName,
    sortByBookPrice,
    sortByBookAuthor,
    sortByNoOfPages,
    sortByBookCategory,
    sortByReleaseYear,
    showBookByIdDialog,
    handleShowBookById,
    handleShowBookByIdClose,
    handleSubmitShowBookById,
    showBookByNameDialog,
    handleShowBookByName,
    handleShowBookByNameClose,
    handleSubmitShowBookByName,
    showBookByNameAndAuthorDialog,
    handleShowBookByNameAndAuthor,
    handleShowBookByNameAndAuthorClose,
    handleSubmitShowBookByNameAndAuthor,
    deleteBookByIdDialog,
    handleDeleteBookById,
    handleDeleteBookByIdClose,
    handleSubmitDeleteBookById,
    deleteBookByNameDialog,
    handleDeleteBookByName,
    handleDeleteBookByNameClose,
    handleSubmitDeleteBookByName,
    deleteBookByDescAndAuthorDialog,
    handleDeleteBookByDescAndAuthor,
    handleDeleteBookByDescAndAuthorClose,
    handleSubmitDeleteBookByDescAndAuthor,
    deleteBookByNameAndCategory,
    handleDeleteBookByNameAndCategory,
    handleDeleteBookByNameAndCategoryClose,
    handleSubmitDeleteBookByNameAndCategory,
    updateBookByName,
    handleUpdateBookByName,
    handleUpdateBookByNameClose,
    handleSubmitUpdateBookByName,
    updateBookByNameAndAuthor,
    handleUpdateBookByNameAndAuthor,
    handleUpdateBookByNameAndAuthorClose,
    handleSubmitUpdateBookByNameAndAuthor,
  };
};
