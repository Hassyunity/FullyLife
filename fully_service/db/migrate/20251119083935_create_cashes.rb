class CreateCashes < ActiveRecord::Migration[8.0]
  def change
    create_table :cashes do |t|
      t.string  :nom, default: "Cash Maison", null: false
      t.string  :devise, default: "MGA", null: false

      t.decimal :solde, precision: 18, scale: 2, default: 0, null: false

      t.text    :notes

      t.timestamps
    end
  end
end
