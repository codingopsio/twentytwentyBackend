const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc - Get all users
// @route - GET api/v1/users
// @access - Public/Admin
exports.getUsers = async (req, res, next) => {
  try {
    console.log(req.query);

    // Advanced Filtering
    let queryString = { ...req.query };
    let fields;

    // For pagination, If **select** is present in the query, then deleting that
    if (req.query.select) {
      const selectFieldDelete = delete queryString.select;
      fields = req.query.select.split(',').join(' ');
    }

    // For pagination, If **page** is present in the query, then deleting that
    if (req.query.page) {
      const pageFieldDelete = delete queryString.page;
    }

    // For pagination, If **limit** is present in the query, then deleting that
    if (req.query.limit) {
      const limitFieldDelete = delete queryString.limit;
    }

    // Filtering for category - eg: Fullstack, Frontend, Nodejs
    let query = JSON.stringify(queryString);
    query = query.replace('in', '$in');

    //  Pagination Logic
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments();

    // For Previous & Next Page
    let pagination = {
      currentPage: page,
    };

    if (endIndex < total) {
      pagination.nextPage = page + 1;
    }

    if (startIndex > page || startIndex === page) {
      pagination.prevPage = page - 1;
    }

    query = await User.find(JSON.parse(query))
      .skip(startIndex)
      .limit(limit)
      .select(fields);

    let users = await query;

    res.status(200).json({
      success: true,
      count: users.length,
      pagination,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Get single user
// @route - GET api/v1/users/:id
// @access - Public/Admin
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse('Sorry, no user found', 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Create User
// @route - POST api/v1/users
// @access - Private/Admin
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Update User
// @route - PUT api/v1/users/:id
// @access - Private/Admin
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return next(new ErrorResponse('Sorry, no user found', 404));
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc - Delete User
// @route - DELETE api/v1/users/:id
// @access - Private/Admin
exports.deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
};
