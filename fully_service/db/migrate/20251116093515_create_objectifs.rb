class CreateObjectifs < ActiveRecord::Migration[8.0]
  def change
    create_table :objectifs do |t|
      t.string :title
      t.text :description
      t.string :category
      t.date :target_date
      t.integer :objectif_status, default: 0, null: false   # <== créer direct en integer
      t.integer :priority, default: 2, null: false
      t.text :notes
      t.timestamps
    end
  end
end
