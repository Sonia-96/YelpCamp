const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
}

module.exports.createCampground = async (req, res) => {
    const campground = new Campground(req.body);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res, next) => {
    const campground = await (await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author'));
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render('campgrounds/show', {campground});
}

module.exports.renderEditForm = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render('campgrounds/edit', {campground});
}

module.exports.updateForm = async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body);
    req.flash("success", "Successfully updated the campground!")
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteForm = async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndRemove(id);
    req.flash("success", "Successfully deleted the campground!")
    res.redirect("/campgrounds");
}