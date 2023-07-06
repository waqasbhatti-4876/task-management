namespace TaskManagementApi
{
    public class Tasks
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int AssignedTo { get; set; }
        public string Status { get; set; }
        public string Name { get; set;}
    }
}
