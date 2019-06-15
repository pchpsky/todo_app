defmodule TodoApp.Todos.Todo do
  use Ecto.Schema
  import Ecto.Changeset

  schema "todos" do
    field :completed, :boolean, default: false
    field :description, :string

    timestamps()
  end

  def changeset(todo, attrs) do
    todo
    |> cast(attrs, [:description, :completed])
    |> validate_required([:description])
    |> validate_length(:description, min: 3)
  end
end
