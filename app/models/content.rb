class Content < ApplicationRecord
  validates_uniqueness_of :info_hash
end
