import { connect } from "react-redux";
import SearchTags from "../components/SearchTags";
import { deleteTag } from "../actions";
import React, { Component } from "react";

const mapStateToProps = state => ({
  tags: state.tags
});

const mapDispatchToProps = dispatch => ({
  deleteTag: id => dispatch(deleteTag(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTags);
