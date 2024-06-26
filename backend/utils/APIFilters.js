class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  searchResult() {
    const search = this.queryStr?.title
      ? { title: { $regex: this.queryStr.title, $options: "i" } }
      : {};

    const userFilter = this.queryStr?.name
      ? { name: { $regex: this.queryStr.name, $options: "i" } }
      : {};
    const tagsFilter = this.queryStr?.tags
      ? { tags: { $regex: this.queryStr.tags, $options: "i" } }
      : {};

    this.query = this.query.find({ ...search, ...userFilter, ...tagsFilter });

    return this;
  }
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // Geçerli sayfa numarası veya varsayılan olarak 1
    const skip = resPerPage * (currentPage - 1); // Atlanacak kayıt sayısı
    this.query = this.query.limit(resPerPage).skip(skip);
  }
}
export default APIFilters;
