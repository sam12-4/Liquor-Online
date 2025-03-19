const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter country name'],
    trim: true,
    maxLength: [50, 'Country name cannot exceed 50 characters']
  },
  code: {
    type: String,
    required: [true, 'Please enter country code'],
    trim: true,
    unique: true,
    uppercase: true,
    minLength: [2, 'Country code must be at least 2 characters'],
    maxLength: [3, 'Country code cannot exceed 3 characters']
  },
  flag: {
    public_id: String,
    url: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  filterMetadata: {
    showInFilters: {
      type: Boolean,
      default: true
    },
    regionId: {
      type: String,
      default: null
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Country', countrySchema); 