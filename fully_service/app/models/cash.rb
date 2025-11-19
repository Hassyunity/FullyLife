class Cash < ApplicationRecord
  has_many :transactions, dependent: :destroy
end
