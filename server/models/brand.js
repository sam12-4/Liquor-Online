const mongoose = require('mongoose');
const slugify = require('slugify');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter brand name'],
    trim: true,
    maxLength: [50, 'Brand name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    maxLength: [500, 'Description cannot exceed 500 characters']
  },
  logo: {
    public_id: String,
    url: String
  },
  website: {
    type: String,
    validate: {
      validator: function(v) {
        // Simple URL validation
        return !v || /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  },
  filterMetadata: {
    featured: {
      type: Boolean,
      default: false
    },
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
brandSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Brand', brandSchema); 