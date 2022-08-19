/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import * as React from 'react';
import '../styles/App.css';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const FEED_QUERY = gql`
  query userInfo($id: ID!) {
    userDetails(id: $id) {
      id
      Name
      Gender
      Age
      Link
    }
  }
`;
const CREATE_LINK_MUTATION = gql`
  mutation createMutation($id: ID!, $Link: String!) {
    update(id: $id, Link: $Link) {
      id
      Name
      Gender
      Age
      Link
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(FEED_QUERY, {
    variables: {
      id: 2,
    },
  });
  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  );
  const [imageChanger1] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      id: 2,
      Link: profileImg,
    },
  });

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);

        imageChanger1();
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  if (loading) return 'Loading';
  if (error) return 'Error';

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>

      <p>{data.userDetails.Name}</p>
      <p>{data.userDetails.Age}</p>
      <p>
        {' '}
        {data.userDetails.Gender}
      </p>

      <div>
        <div>
          <img
            src={data.userDetails.Link}
            height={200}
            width={200}
            alt="vv"
            id="img"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          name="image-upload"
          id="input"
          onChange={imageHandler}
        />
        <div>

          <label htmlFor="input" />

        </div>
      </div>

    </div>
  );
}
export default App;
