const mongoose = require('mongoose');
const slugify = require('slugify');

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter type name'],
    trim: true,
    maxLength: [50, 'Type name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  // Types can belong to multiple categories
  categoryIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  filterMetadata: {
    displayName: String,
    showInFilters: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Generate slug from name before saving
typeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Type', typeSchema); 