import { connect } from "react-redux";
import SearchTags from "../components/SearchTags";
import { deleteTag } from "../actions";

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
