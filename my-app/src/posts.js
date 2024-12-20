import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './posts.css'; // Make sure the CSS is being imported

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authors, setAuthors] = useState({});
  const [media, setMedia] = useState({});

  useEffect(() => {
    axios.get('http://wordpress-project.local/wp-json/wp/v2/posts')
      .then(response => {
        setPosts(response.data);
        const authorIds = response.data.map(post => post.author);

        // Fetch authors data
        axios.get(`http://wordpress-project.local/wp-json/wp/v2/users?include=${authorIds.join(',')}`)
          .then(authorResponse => {
            const authorData = authorResponse.data.reduce((acc, user) => {
              acc[user.id] = user.name;
              return acc;
            }, {});
            setAuthors(authorData);
          })
          .catch(error => {
            console.error('Error fetching authors!', error);
            setError('Failed to load author data.');
          });

        // Fetch media data (featured images)
        const mediaIds = response.data.map(post => post.featured_media).filter(id => id !== 0);
        if (mediaIds.length > 0) {
          axios.get(`http://wordpress-project.local/wp-json/wp/v2/media?include=${mediaIds.join(',')}`)
            .then(mediaResponse => {
              const mediaData = mediaResponse.data.reduce((acc, mediaItem) => {
                acc[mediaItem.id] = mediaItem.source_url;
                return acc;
              }, {});
              setMedia(mediaData);
            })
            .catch(error => {
              console.error('Error fetching media (images)!', error);
            });
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="posts-container">
      {/* <h1>WordPress Posts</h1> */}
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id} className="post-item">
            <h2>{post.title.rendered}</h2>
            {media[post.featured_media] && (
              <a href={post.link}>
                <img src={media[post.featured_media]} alt={post.title.rendered} className="post-thumbnail" />
              </a>
            )}
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            <p>By: {authors[post.author] || 'Unknown Author'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
