import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from '../Comment/Comment';
import { Grid } from '../Grid/Grid';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../redux/filterSlice';
import { useGetCommentsQuery } from '../../redux/commentApi';

export const Comments = () => {
  const filter = useSelector(selectFilter);

  const { data: comments } = useGetCommentsQuery();

  const filteredComments = comments?.filter(({ content }) => content.toLowerCase().includes(filter));
  if (!comments) return;
  return <Grid>{comments && filteredComments.map((comment) => <Comment key={comment.id} {...comment} />)}</Grid>;
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape().isRequired),
};
