import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import Filters from './Filters';
import SearchBar from './SearchBar';
import Loader from './Loader';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  useEffect(() => {
    let sortedPosts = [...filteredPosts];
    if (sortBy === 'titleAsc') {
      sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'titleDesc') {
      sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'userIdAsc') {
      sortedPosts.sort((a, b) => a.userId - b.userId);
    } else if (sortBy === 'userIdDesc') {
      sortedPosts.sort((a, b) => b.userId - a.userId);
    }
    setFilteredPosts(sortedPosts);
  }, [sortBy]);

  useEffect(() => {
    let filteredData = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedUserId ? post.userId === parseInt(selectedUserId) : true)
    );
    setFilteredPosts(filteredData);
  }, [searchQuery, selectedUserId, posts]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchBar setSearchQuery={setSearchQuery} />
          <Filters setSortBy={setSortBy} setSelectedUserId={setSelectedUserId} />
          <div className="post-list">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <p>No posts match your criteria.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
