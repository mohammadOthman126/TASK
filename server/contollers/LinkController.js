const Link = require("../model/Link");


const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};


const generateSlug = () => Math.random().toString(36).substring(2, 8);


exports.createLink = async (req, res) => {
  try {
    const { target, slug } = req.body;
    if (!target || !isValidUrl(target))
      return res.status(400).json({ error: "Invalid URL" });

    let finalSlug = slug ? slug.toLowerCase() : generateSlug();

    if (await Link.findOne({ slug: finalSlug }))
      return res.status(409).json({ error: "Slug already exists" });

    const newLink = await Link.create({ target, slug: finalSlug });
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.getLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.redirect = async (req, res) => {
  try {
    const link = await Link.findOne({ slug: req.params.slug });
    if (!link) return res.status(404).json({ error: "Slug not found" });

    link.clicks += 1;
    await link.save();
    res.redirect(302, link.target);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.incrementClicks = async (req, res) => {
  try {
    const link = await Link.findOne({ slug: req.params.slug });
    if (!link) return res.status(404).json({ error: "Slug not found" });

    link.clicks += 1;
    await link.save();
    res.json(link);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
