exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.paginate = (p="1",l="10",model)=>{
  const page =parseInt(p)
  const limit =parseInt(l)
  const startIndex = (page-1) * limit
  const endIndex = page * limit
  const results = {}

  if(endIndex < model.length){
    results.next ={
      page: page + 1,
      limit:limit
    }
  }
  if(startIndex > 0){
    results.previous = {
      page: page -1,
      limit:limit
    }
  }
  results.paginated = model.slice(startIndex, endIndex) 
  results.total = model.length
  return results
  

}


